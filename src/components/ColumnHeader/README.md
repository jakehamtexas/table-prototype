It might be a good idea given this pattern to use a mixin for the base TableColumnHeader
functionality and then create components that have coupling to the kind of sorting/filtering
available for the datatype.

e.g. FeetColumnHeader, NumberColumnHeader, TextColumnHeader
