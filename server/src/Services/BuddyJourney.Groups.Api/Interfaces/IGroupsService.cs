using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BuddyJourney.Core.Data;
using BuddyJourney.Core.Data.Dto;
using BuddyJourney.Groups.Api.Models.Dto;
using MongoDB.Bson;

namespace BuddyJourney.Groups.Api.Interfaces
{
    public interface IGroupsService
    {
        IEnumerable<GroupsInfoDto> GetBySearch(string searchTerm, ObjectId userId);
        Task<Models.Groups> GetById(ObjectId groupId);
        IEnumerable<string> GetNamesByUserForConnection(ObjectId userId);
        IEnumerable<GroupsInfoDto> GetByUser(ObjectId userId);
        Task<Models.Groups> RegisterGroup(GroupsDto groupDto, string uriImage);
        Task<Models.Groups> UpdateGroup(GroupsDto groupDto, ObjectId userId);
        Task<Models.Groups> UpdateGroupImage(string image, ObjectId groupId);
        Task<Models.Groups> AssociateUser(string groupId, UserProfileEmbed user);
        Task<bool> DisassociateUser(string groupId, string userId, string administratorId);
        Task<bool> Delete(string groupId, string administratorId);
    }
}