using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Notes.Api.Options;
using Notes.Api.Storage.Entities;
using System;
using System.Threading.Tasks;

namespace Notes.Api.Storage
{
    public class StorageService<T> : IStorageService<T> where T : TableEntity
    {
        private readonly StorageOptions _storageOptions;
        private readonly ILogger<StorageService<T>> _logger;

        public StorageService(
            IOptions<StorageOptions> storageOptions,
            ILogger<StorageService<T>> logger
            )
        {
            _storageOptions = storageOptions.Value;
            _logger = logger;
        }

        public async Task<CloudTable> CreateTableAsync(string tableName)
        {
            var storageAccount = CreateStorageAccountFromConnectionString(_storageOptions.ConnectionString);

            var tableClient = storageAccount.CreateCloudTableClient(new TableClientConfiguration());

            var table = tableClient.GetTableReference(tableName);

            if (await table.CreateIfNotExistsAsync())
            {
                _logger.LogInformation($"Created Table named: {tableName}");
            }
            else
            {
                _logger.LogInformation($"Table {tableName} already exists");
            }

            return table;
        }

        public async Task<T> InsertOrMergeEntityAsync(CloudTable table, T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            try
            {
                var insertOrMergeOperation = TableOperation.InsertOrMerge(entity);
                var result = await table.ExecuteAsync(insertOrMergeOperation);
                var insertedEntity = result.Result as T;

                if (result.RequestCharge.HasValue)
                {
                    _logger.LogInformation($"Request Charge of InsertOrMerge Operation: {result.RequestCharge}");
                }

                return insertedEntity;
            }
            catch (StorageException e)
            {
                _logger.LogError(e, e.Message);
                throw;
            }
        }

        public async Task<T> RetrieveEntityUsingPointQueryAsync(CloudTable table, string partitionKey, string rowKey)
        {
            try
            {
                var retrieveOperation = TableOperation.Retrieve<NoteEntity>(partitionKey, rowKey);
                var result = await table.ExecuteAsync(retrieveOperation);
                var entity = result.Result as T;
                if (entity != null)
                {
                    _logger.LogInformation($"Retrieved entity: {entity.PartitionKey}, {entity.RowKey}");
                }

                if (result.RequestCharge.HasValue)
                {
                    _logger.LogInformation($"Request Charge of Retrieve Operation: {result.RequestCharge}");
                }

                return entity;
            }
            catch (StorageException e)
            {
                _logger.LogError(e, e.Message);
                throw;
            }
        }

        public async Task DeleteEntityAsync(CloudTable table, T deleteEntity)
        {
            try
            {
                if (deleteEntity == null)
                {
                    throw new ArgumentNullException("deleteEntity");
                }

                TableOperation deleteOperation = TableOperation.Delete(deleteEntity);
                TableResult result = await table.ExecuteAsync(deleteOperation);

                if (result.RequestCharge.HasValue)
                {
                    _logger.LogInformation($"Request Charge of Delete Operation: {result.RequestCharge}");
                }

            }
            catch (StorageException e)
            {
                _logger.LogError(e, e.Message);
                throw;
            }
        }

        private CloudStorageAccount CreateStorageAccountFromConnectionString(string storageConnectionString)
        {
            CloudStorageAccount storageAccount;

            try
            {
                storageAccount = CloudStorageAccount.Parse(storageConnectionString);
            }
            catch (FormatException)
            {
                _logger.LogInformation($"Invalid storage account information provided. Please confirm the AccountName and AccountKey are valid in the app.config file - then restart the application.");
                throw;
            }
            catch (ArgumentException)
            {
                _logger.LogInformation($"Invalid storage account information provided. Please confirm the AccountName and AccountKey are valid in the app.config file - then restart the application.");
                throw;
            }

            return storageAccount;
        }
    }
}
