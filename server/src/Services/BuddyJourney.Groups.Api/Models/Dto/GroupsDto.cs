using System;
using System.ComponentModel.DataAnnotations;
using BuddyJourney.Core.Data.Dto;
using BuddyJourney.WebApi.Core.Model.Dto;

namespace BuddyJourney.Groups.Api.Models.Dto
{
    public class GroupsDto
    {
        [Required(ErrorMessage = "O campo nome é obrigatório")]
        [StringLength(200, ErrorMessage = "O campo senha precisa ter no máximo {1} caracteres")]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        [StringLength(500, ErrorMessage = "O campo descrição precisa ter entre {2} e {1} caracteres",
            MinimumLength = 10)]
        public string Description { get; set; }

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        [StringLength(200, ErrorMessage = "O campo senha precisa ter no máximo {1} caracteres")]
        public string Destination { get; set; }

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        public DateTime TravelDate { get; set; }

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        public int NumberMaxOfMembers { get; set; }
        
        [Required(ErrorMessage = "O perfil do usuário administrador é obrigatório")]
        public UserProfileEmbedDto Administrator { get; set; }

        public UploadImageDto Picture { get; set; }

        public string UriImage { get; set; }
    }
}