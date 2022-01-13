using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Strelly
{
    public class ValidationFailedResult : ObjectResult
    {
        public ValidationFailedResult(ModelStateDictionary modelState, int statusCode) : base(new ValidationResultModel(modelState, statusCode))
        {
            StatusCode = statusCode;
        }
    }
}
