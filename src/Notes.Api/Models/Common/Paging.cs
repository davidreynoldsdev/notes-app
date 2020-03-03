using System;

namespace Notes.Api.Models.Common
{
    public class Paging
    {
        public int Page { get; set; }

        public int Skip { get; set; }

        public int Limit { get; set; }

        public Paging(int? page, int? limit)
        {
            Page =  page ?? 0;
            Limit = limit == null ? int.MaxValue : Math.Min(limit.Value, 100);
            Skip = (Page - 1) * Limit;
        }
    }
}
