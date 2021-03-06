﻿using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Notes.Api.Models.V1;
using Notes.Api.Features.Notes;
using System;
using Notes.Api.Models.Common;
using Microsoft.AspNetCore.Authorization;

namespace Notes.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<NotesController> _logger;

        public NotesController(
            IMediator mediator,
            ILogger<NotesController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpPost]
        [Authorize("WriteNotes")]
        public async Task<IActionResult> Add([FromBody] NoteDto note)
        {
            var command = new Create.Command(note.Title, note.Body);

            var response = await _mediator.Send(command);

            return CreatedAtAction(
                    nameof(Get),
                    new { id = response },
                    null);
        }

        [HttpPut("{id}")]
        [Authorize("WriteNotes")]
        public async Task<IActionResult> Put(
            [FromRoute] Guid id, 
            [FromBody] NoteDto note)
        {
            var command = new Update.Command(id, note.Title, note.Body);

            var response = await _mediator.Send(command);

            return Ok();
        }

        [HttpGet()]
        [Authorize("ReadNotes")]
        public async Task<ActionResult<string>> Get(
            [FromQuery] int? page,
            [FromQuery] int? limit,
            [FromQuery] string searchText)
        {
            var command = new GetAll.Query
            {
                Paging = new Paging(page, limit),
                SearchText = searchText
            };

            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [Authorize("ReadNotes")]
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get([FromRoute] Guid id)
        {
            var command = new Get.Query(id);

            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [Authorize("WriteNotes")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> Delete([FromRoute] Guid id)
        {
            var command = new Delete.Command(id);

            var response = await _mediator.Send(command);

            return Ok(response);
        }
    }
}
