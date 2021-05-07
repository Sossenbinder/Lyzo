using System.Threading.Tasks;
using Lyzo.Module.Notifications.DataTypes;
using Microsoft.AspNetCore.SignalR;

namespace Lyzo.Common.SignalR.Extensions
{
	public static class IClientProxyExtensions
	{
		public static Task SendNotification<T>(this IClientProxy clientProxy, Notification<T> notification)
		{
			return clientProxy.SendCoreAsync("SendNotification", new object[] { notification });
		}
	}
}