using System;

namespace Notes.Api.Models.Common
{
    public class Limit
    {
        public int Value { get; }

        public Limit(int? limit)
        {
            Value = limit == null ? int.MaxValue : Math.Min(limit.Value, 100);
        }
    }
}
