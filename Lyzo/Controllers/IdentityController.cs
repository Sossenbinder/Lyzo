using System;
using Lyzo.Controllers.Base;
using Microsoft.AspNetCore.Mvc;

namespace Lyzo.Controllers
{
	[Route("[controller]")]
	public class IdentityController : IdentityControllerBase
	{
		[HttpGet]
		[Route("Identify")]
		public void Identify()
		{
			if (Request.Cookies.ContainsKey(IDENT_COOKIE_NAME))
			{
				return;
			}

			Response.Cookies.Append(IDENT_COOKIE_NAME, Guid.NewGuid().ToString());
		}
	}
}