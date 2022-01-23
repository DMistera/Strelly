using System.ComponentModel.DataAnnotations;

namespace Strelly
{
    public class ColumnCreateUpdate
    {
        [Required]
        public string Name { get; set; }
        public int Order { get; set; }

        public Column ToColumn()
        {
            Column column = new();
            UpdateColumn(column);
            return column;
        }

        public void UpdateColumn(Column column)
        {
            column.Name = Name;
        }
    }
}
