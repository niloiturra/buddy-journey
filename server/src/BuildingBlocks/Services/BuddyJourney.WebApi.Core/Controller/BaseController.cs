using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BuddyJourney.WebApi.Core.Controller
{
    [ApiController]
    public abstract class BaseController: Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ICollection<string> _errors = new List<string>();
        protected ActionResult CustomResponse(object result = null)
        {
            if (InvalidOperation())
            {
                return Ok(result);
            }

            return BadRequest(new ValidationProblemDetails(new Dictionary<string, string[]>
            {
                { "messages", _errors.ToArray() }
            }));
        }

        protected ActionResult CustomResponse(ModelStateDictionary modelState)
        {
            var errors = modelState.Values.SelectMany(e => e.Errors);
            foreach (var error in errors)
            {
                AddProcessingError(error.ErrorMessage);
            }

            return CustomResponse();
        }

        protected bool InvalidOperation()
        {
            return !_errors.Any();
        }

        protected void AddProcessingError(string error)
        {
            _errors.Add(error);
        }

        protected void ClearProcessingError()
        {
            _errors.Clear();
        }
    }
}