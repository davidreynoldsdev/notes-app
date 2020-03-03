namespace Notes.Api.Options
{
    public class StorageOptions
    {
        public string ConnectionString { get; set; }

        public NotesOptions Notes { get; set; }
    }
}
