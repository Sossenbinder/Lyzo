namespace Lyzo.Common.SignalR.DataTypes
{
	public enum WebRtcCommands
	{
		RemoteOffer,
		OfferRespondedTo,
		IceCandidateReceived,
	}

	public enum GroupCommand
	{
		JoinConfirmation,
		NewParticipant,
		Disconnected,
		ParticipantCountUpdated,
	}
}