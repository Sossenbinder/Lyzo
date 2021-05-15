using System.Threading.Tasks;
using Lyzo.Common.SignalR.Base;

namespace Lyzo.Common.SignalR
{
	public partial class SignalRHub : BaseHub
	{
		public override Task OnConnectedAsync()
		{
			return base.OnConnectedAsync();
		}
	}
}