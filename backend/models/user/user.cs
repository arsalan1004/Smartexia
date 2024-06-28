using System.ComponentModel;
using System.Numerics;
using Supabase.Postgrest.Attributes;

namespace backend.models.user;

public class User
{
    [PrimaryKey("id")]
    public int id { get; set; }
    
    [Column("name"),DefaultValue(null)]
    public string name { get; set; }
    
    [Column("email"),DefaultValue(null)]
    public string email{ get; set; }
    
    [Column("password"),DefaultValue(null)]
    public string password{ get; set; }

    [Column("phoneNum"), DefaultValue(null)]
    public int phoneNum { get; set; }
}
