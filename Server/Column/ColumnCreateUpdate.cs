namespace Strelly
{
    public class ColumnCreateUpdate
    {
        public string Name { get; set; }

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
