using MediatR;
using Microsoft.Extensions.Options;
using Notes.Api.Features.Models;
using Notes.Api.Models.Common;
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
            public Paging Paging { get; set; }

            public string SearchText { get; set; }
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
                        Body = GetBody(x.Body)
                    })
                    .ToList();

                return notes
                    .Where(m =>
                        request.SearchText == null ||
                        searchSegments.Any(x => m.Title.Contains(x, StringComparison.InvariantCultureIgnoreCase)) ||
                        searchSegments.Any(x => m.Body.Contains(x, StringComparison.InvariantCultureIgnoreCase)))
                    .OrderBy(m => m.Title)
                    .Skip(request.Paging.Skip)
                    .Take(request.Paging.Limit);
            }

            private string GetBody(string body)
            {
                var length = 50;
                var ellipses = "..";

                if(body.Length < length)
                {
                    return body;
                }
                else
                {
                    return body.Substring(0, length) + ellipses;
                }
            }
        }
    }
}
