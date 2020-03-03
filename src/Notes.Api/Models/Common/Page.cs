namespace Notes.Api.Models.Common
{
    public class Page
    {
        public int Value { get; }

        public Page(int? page)
        {
            Value = page ?? 0;
        }
    }
}
