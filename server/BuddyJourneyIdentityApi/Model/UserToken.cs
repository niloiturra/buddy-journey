using System.Collections.Generic;

namespace BuddyJourneyIdentityApi.Model
{
    public class UserToken
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public IEnumerable<UserClaim> Claims { get; set; }
    }
}