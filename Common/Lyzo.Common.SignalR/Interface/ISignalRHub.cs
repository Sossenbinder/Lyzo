using Lyzo.Module.Notifications.DataTypes;
using System.Threading.Tasks;

namespace Lyzo.Common.SignalR.Interface
{
	public interface ISignalRHub
	{
		Task SendNotification<T>(Notification<T> notification);
	}
}