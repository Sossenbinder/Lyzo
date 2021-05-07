using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Lyzo.Controllers.Base
{
	[AutoValidateAntiforgeryToken]
	public abstract class IdentityControllerBase : Controller
	{
		protected const string IDENT_COOKIE_NAME = "ClientIdent";

		protected Guid? UserIdOrNull { get; private set; }

		protected Guid UserId => UserIdOrNull!.Value;

		public override void OnActionExecuting(ActionExecutingContext context)
		{
			InitUser(context.HttpContext.Request);
			base.OnActionExecuting(context);
		}

		private void InitUser(HttpRequest request)
		{
			if (!request.Cookies.TryGetValue(IDENT_COOKIE_NAME, out var identValue))
			{
				return;
			}

			if (Guid.TryParse(identValue, out var userId))
			{
				UserIdOrNull = userId;
			}
		}
	}
}