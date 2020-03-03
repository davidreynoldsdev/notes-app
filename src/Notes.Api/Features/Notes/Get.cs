using MediatR;
using Microsoft.Extensions.Options;
using Notes.Api.Features.Models;
using Notes.Api.Options;
using Notes.Api.Storage;
using Notes.Api.Storage.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Notes.Api.Features.Notes
{
    public class Get
    {
        public class Query : IRequest<Note>
        {
            public Guid Id { get; }

            public Query(Guid id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Note>
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

            public async Task<Note> Handle(Query request, CancellationToken cancellationToken)
            {
                var table = await _storageService.CreateTableAsync(_storageOptions.Notes.TableName);

                var noteEntity = await _storageService.RetrieveEntityUsingPointQueryAsync(
                    table,
                    _storageOptions.Notes.PartitionKey,
                    request.Id.ToString());

                return new Note
                {
                    Id = request.Id,
                    Title = noteEntity.Title,
                    Body = noteEntity.Body
                };
            }
        }
    }
}
