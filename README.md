

# AsyncLists
A small developer friendly JS module for when you need to update the drop with dynamic data in a repetetive format.

## Getting Started
See the index.html for example html layout and the JS file for an example data setup.

### Define your endpoint
Add the async-endpoint attribute to your list wrapper element. 
This is the container element for your list items.
```html
  <ul async-endpoint="/api/animals/" />
```

### Create the template
Give it the hidden="true" attribute, and a unique selector:
```html
  <li animal-template hidden="true"/>
```
And reference this selector on the wrapper:
```html
  <ul async-endpoint="/api/animals/" template-selector="[animal-template]" />
```
### Add some data
Data from the api might look something like this:
```json
{
  "pageCount": 2,
  "page": 1,
  "content": [
    [
      {
        "selector": "[animal-title]",
        "type": "innerHtml",
        "value": "Puppy"
      },
      {
        "selector": "[img-src]",
        "type": "attribute",
        "attribute": "src",
        "value": "https://source.unsplash.com/random/400x200?puppy"
      }
    ],
    [
      {
        "selector": "[animal-title]",
        "type": "innerHtml",
        "value": "Kitty"
      },
      {
        "selector": "[animal-src]",
        "type": "attribute",
        "attribute": "src",
        "value": "https://source.unsplash.com/random/400x200?kitten"
      }
    ]
  ]
}
```
And the corresponding template might look like this:
```html
<li animal-template hidden="true">
    <img animal-src/>
    <h2 animal-title/>
</li>
```
**Note**
The data format is somewhat strongly tied to the module logic. For the module to function correctly, the response data must be laid out as above. 
The content attribute holds an array items. And each item holds an array of properties.
For each item, the module will copy the template, inject the provided fields and append it to the parent.

### User controls
Add a load more button:
```html
<button async-more>Load more!</button>
```
Or add Previous and Next controls:
```html
<button async-prev>Previous</button>
<button async-next>Next</button>
```
### Filtering
Add some checkboxes with a group selector ('[animal-filter]' in this case):
```html
<input animal-filter type="checkbox"  name="dog">
<input animal-filter type="checkbox"  name="cat">
```
And reference them on the parent:
```html
<ul 
   async-endpoint="/api/animals/" 
   template-selector="#my-fancy-template" 
   filter-selector="[animal-filter]"
/>
```
When a checkbox is changed, the api will be called again with the new filters:
```
/api/animals?page=1&tag=dog
```


 

## Authors

 **Initial work** - [AndyWebster](https://github.com/AndyWebster)



