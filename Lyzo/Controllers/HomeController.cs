using Microsoft.AspNetCore.Mvc;

namespace Lyzo.Controllers
{
	public class HomeController : Controller
	{
		public IActionResult Index()
		{
			return View("~/Views/Index.cshtml");
		}
	}
}