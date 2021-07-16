﻿using System.Threading.Tasks;

namespace BuddyJourneyIdentityApi.Interfaces
{
    public interface IEmailSenderService
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}