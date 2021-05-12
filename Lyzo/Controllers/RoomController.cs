using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Lyzo.Common.Web.DataTypes.Responses;
using Lyzo.Module.Rooms.DataTypes;
using Lyzo.Module.Rooms.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Lyzo.Controllers
{
	[Route("[controller]")]
	public class RoomController : ControllerBase
	{
		private readonly IRoomManagementService _roomManagementService;

		public RoomController(IRoomManagementService roomManagementService)
		{
			_roomManagementService = roomManagementService;
		}

		[HttpGet]
		[Route("GetRooms")]
		public async Task<JsonDataResponse<List<Room>>> GetRooms()
		{
			var rooms = await _roomManagementService.GetRooms();

			return JsonDataResponse<List<Room>>.Success(rooms);
		}

		[HttpPost]
		[Route("CreateRoom")]
		public async Task<JsonDataResponse<Guid>> CreateRoom([FromBody] Room roomDetails)
		{
			var roomId = await _roomManagementService.CreateRoom(roomDetails);

			return JsonDataResponse<Guid>.Success(roomId);
		}
	}
}