using System.Diagnostics.CodeAnalysis;
using Microsoft.Extensions.Logging;

namespace Lyzo.Module.ServiceBase
{
	public class LyzoServiceBase : LyzoServiceBaseWithoutLogger
	{
		[NotNull]
		protected readonly ILogger Logger;

		protected LyzoServiceBase([NotNull] ILogger logger)
		{
			Logger = logger;
		}
	}
}