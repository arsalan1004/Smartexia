using System.ComponentModel;
using Supabase.Postgrest.Attributes;

namespace backend.DTOs.userDto;

public class userdto
{
    [Column("name"),DefaultValue(null)]
    public string name { get; set; }
    
    [Column("email"),DefaultValue(null)]
    public string email{ get; set; }
    
    [Column("password"),DefaultValue(null)]
    public string password{ get; set; }

    [Column("phoneNum"), DefaultValue(null)]
    public int phoneNum { get; set; }
}