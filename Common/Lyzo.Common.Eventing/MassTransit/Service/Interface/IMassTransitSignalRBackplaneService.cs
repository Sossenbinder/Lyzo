using System.Threading.Tasks;
using Lyzo.Common.Eventing.DataTypes;

namespace Lyzo.Common.Eventing.MassTransit.Service.Interface
{
	public interface IMassTransitSignalRBackplaneService
	{
		Task RaiseAllSignalREvent<T>(Notification<T> notification, string[]? excludedConnectionIds = null);

		Task RaiseConnectionSignalREvent<T>(string connectionId, Notification<T> notification);

		Task RaiseGroupSignalREvent<T>(string groupName, Notification<T> notification, string[]? excludedConnectionIds = null);

		Task RaiseUserSignalREvent<T>(string userId, Notification<T> notification);
	}
}