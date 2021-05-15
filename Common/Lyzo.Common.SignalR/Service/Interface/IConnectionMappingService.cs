namespace Lyzo.Common.SignalR.Service.Interface
{
	public interface IConnectionMappingService
	{
		void PutIdForClient(string clientIdent, string connectionId);

		string? GetIdForClient(string clientIdent);

		void DisconnectClient(string clientIdent);
	}
}