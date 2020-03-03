using MediatR;
using Microsoft.Extensions.Options;
using Notes.Api.Features.Models;
using Notes.Api.Options;
using Notes.Api.Storage;
using Notes.Api.Storage.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Notes.Api.Features.Notes
{
    public class GetAll
    {
        public class Query : IRequest<IEnumerable<Note>>
        {
            public int Page { get; set; }

            public int Limit { get; set; }

            public string SearchText { get; set; }

            public int Skip
            {
                get
                {
                    return (Page - 1) * Limit;
                }
            }
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Note>>
        {
            private readonly IStorageService<NoteEntity> _storageService;
            private readonly StorageOptions _storageOptions;

            public Handler(
                IStorageService<NoteEntity> storageService,
                IOptions<StorageOptions> storageOptions)
            {
                _storageService = storageService;
                _storageOptions = storageOptions.Value;
            }

            public async Task<IEnumerable<Note>> Handle(Query request, CancellationToken cancellationToken)
            {
                var searchSegments = request.SearchText?.Split(' ', StringSplitOptions.RemoveEmptyEntries);

                var table = await _storageService.CreateTableAsync(_storageOptions.Notes.TableName);

                var notes = table.CreateQuery<NoteEntity>()
                    .Where(x => x.PartitionKey == _storageOptions.Notes.PartitionKey)
                    .Select(x => new Note()
                    {
                        Id = Guid.Parse(x.RowKey),
                        Title = x.Title,
                        Body = x.Body
                    })
                    .ToList();

                return notes
                    .Where(m =>
                        request.SearchText == null ||
                        searchSegments.Any(x => m.Title.Contains(x, StringComparison.InvariantCultureIgnoreCase)))
                    .OrderBy(m => m.Title)
                    .Skip(request.Skip)
                    .Take(request.Limit);
            }
        }
    }
}
