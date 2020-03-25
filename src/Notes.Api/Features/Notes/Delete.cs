using MediatR;
using Microsoft.Extensions.Options;
using Notes.Api.Options;
using Notes.Api.Storage;
using Notes.Api.Storage.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Notes.Api.Features.Notes
{
    public class Delete
    {
        public class Command : IRequest<Guid>
        {
            public Guid Id { get; }

            public Command(Guid id) => Id = id;
        }

        public class Handler : IRequestHandler<Command, Guid>
        {
            private readonly IStorageService<NoteEntity> _storageService;
            private readonly StorageOptions _storageOptions;

            public Handler(IStorageService<NoteEntity> storageService,
                IOptions<StorageOptions> storageOptions)
            {
                _storageService = storageService;
                _storageOptions = storageOptions.Value;
            }

            public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
            {
                var table = await _storageService.CreateTableAsync(_storageOptions.Notes.TableName);

                var noteEntity = await _storageService.RetrieveEntityUsingPointQueryAsync(
                    table,
                    _storageOptions.Notes.PartitionKey,
                    request.Id.ToString());

                await _storageService.DeleteEntityAsync(table, noteEntity);

                return request.Id;
            }
        }
    }
}
