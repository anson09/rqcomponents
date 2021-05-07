# RqHeader

## props

### notification: string | slot

Default: ""

Raise a warning on the top of the header.

### before-logout: function(return promise to do async job)

Default: null

Custom way to handle logout event.

### home: object

Default:

```js
{
    tooltipText: "回到米筐官网首页",
    link: { path: "/", outer: true }
}
```

tooltipText: string, required  
link.path: string, required  
link.newBlock: boolean, optional, open in new tab  
link.outer: boolean, optional, use location instead of vue router

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

# RqLogin

## props

### logo: file path with hash

Default: ricequant logo

The specified logo.

## events

### after-login

Parameters:

Triggers when user login in.
