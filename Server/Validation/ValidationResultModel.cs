using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Strelly
{

    public class ValidationResultModel
    {
        public int Status { get; }

        public Dictionary<string, string[]> Errors { get; }

        public ValidationResultModel(ModelStateDictionary modelState, int Status)
        {
            this.Status = Status;
            Errors = new Dictionary<string, string[]>();
            foreach(var key in modelState.Keys) {
                Errors[key] = modelState[key].Errors.Select(e => e.ErrorMessage).ToArray();
            }
        }
    }
}
