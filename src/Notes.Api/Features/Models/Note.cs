using System;

namespace Notes.Api.Features.Models
{
    public class Note
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Body { get; set; }
    }
}
