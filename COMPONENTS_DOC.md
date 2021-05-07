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

### has-message boolean

Default: true

rqmessage switch

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

# RqPicture

> A component for using pictures in avif and webp formats on broswers supporting them while not affecting their display on others.

## props

### src(required): String | Object

Be careful that the src can't be the direct path of picture, like `<RqPicture src="/assets/img/404.png"/>`❎. We recommand using pictures by importing, such as `import imgs from "/path/*.*"`✅ or `import imgs from "/path/name.*"`✅, which import and use pictures as variables . If you insists on using path, you can use picture tag directly in your components, just as the RqPicture components do.

#### string

the path of single picture

#### object attributes

- avif: the path of avif picture
- webp: the path of webp picture
- fallback: the path of default picture when browser don't support the formats above
