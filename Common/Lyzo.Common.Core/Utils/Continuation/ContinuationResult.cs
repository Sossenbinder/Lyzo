using System.Collections.Generic;

namespace Lyzo.Common.Core.Utils.Continuation
{
	public class ContinuationResult<T>
	{
		public string ContinuationToken { get; set; }

		public List<T> Payload { get; set; }
	}
}