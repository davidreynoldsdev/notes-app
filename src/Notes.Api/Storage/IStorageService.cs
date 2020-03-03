using Microsoft.Azure.Cosmos.Table;
using System.Threading.Tasks;

namespace Notes.Api.Storage
{
    public interface IStorageService<T> where T : TableEntity
    {
        Task<CloudTable> CreateTableAsync(string tableName);

        Task<T> InsertOrMergeEntityAsync(CloudTable table, T entity);

        Task<T> RetrieveEntityUsingPointQueryAsync(CloudTable table, string partitionKey, string rowKey);

        Task DeleteEntityAsync(CloudTable table, T deleteEntity);
    }
}
