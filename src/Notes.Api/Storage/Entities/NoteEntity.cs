using Microsoft.Azure.Cosmos.Table;

namespace Notes.Api.Storage.Entities
{
    public class NoteEntity : TableEntity
    {
        public NoteEntity()
        {
        }

        public NoteEntity(string partitionKey, string rowKey)
        {
            PartitionKey = partitionKey;
            RowKey = rowKey;
        }

        public string Title { get; set; }

        public string Body { get; set; }
    }
}
