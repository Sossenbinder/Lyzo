using Microsoft.AspNetCore.SignalR;
using Lyzo.Common.SignalR.Interface;

namespace Lyzo.Common.SignalR
{
	public class SignalRHub : Hub<ISignalRHub>
	{
	}
}