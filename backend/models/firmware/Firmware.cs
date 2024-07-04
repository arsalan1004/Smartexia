using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models.firmware;

public class Firmware
{
    [Column("id")]
    public int id { get; set; }
    [Column("version")]
    public string version { get; set; }
}