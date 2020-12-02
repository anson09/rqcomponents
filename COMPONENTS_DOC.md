# RqHeader

## props

### notification: string | slot

Default: ""

Raise a warning on the top of the header.

### before-logout: function(done: function) {}

Default: null

Custom way to handle logout event.

## events

### create-workspace

Parameters:

Triggers when user click create workspace button.

### switch-workspace

Parameters: currentWorkspaceId

Triggers when current workspace change.

# RqNotFound

# RqMaintenance

## props

### date: string

Default: ""

The maintenance time.
