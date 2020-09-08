

# AsyncLists
AsyncLists is a JS library created to handle populating the DOM with dynamic list data from an endpoint.
The library can be operated entirely by adding attributes to your HTML elements. No additional javascript is required.

## Requirements
* Some kind of endpoint ready to draw data from.
* An HTML document with elements ready to populate with data.

## Getting Started
See the example folder to get an idea of how the library attributes are applied to your HTML.

### Define your endpoint
Add the ```async-endpoint``` attribute to your wrapper element. 
This is the container element for your list items.
```html
<ul async-endpoint="/api/animals/" />
```

### Create the template
Give the template a selector e.g. ```animal-template``` and the ```hidden="true"``` attribute and reference it on the wrapper.
```html
<ul 
  async-endpoint="/api/animals/" 
  template-selector="[animal-template]" 
/>
<li animal-template hidden="true"/>
```
Add some non-unique selectors (i.e. class, attribute or tag) to the template to define where the data will be injected.
```html
<ul 
  async-endpoint="/api/animals/" 
  template-selector="[animal-template]" 
/>
<li animal-template hidden="true">
  <img item-img-src />
  <h2 item-title />
</li>
```
### Add some data
Data returned by your endpoint might look something like this:
```json
{
  "animals": [
    {
      "species": "cat",
      "properties": [
        {
          "selector":"[item-title]",
          "type":"innerHTML",
          "value":"Cat"
        },
        {
          "selector":"[item-img-src]",
          "type":"attribute",
          "attribute":"src",
          "value":"https://source.unsplash.com/random/400x200?cat"
        }
      ]
    },
    {
      "species": "dog",
      "properties": [
        {
          "selector":"[item-title]",
          "type":"innerHTML",
          "value":"Dog"
        },
        {
          "selector":"[item-img-src]",
          "type":"attribute",
          "attribute":"src",
          "value":"https://source.unsplash.com/random/400x200?dog"
        }
      ]
    }
  ]
}
```

In this example, the template will be cloned for each item in the ```"animals"``` array.

The ```"selector"``` of each field in the ```"properties"``` array defines where in the template to inject the ```"value"```.

**Note** The value will only be injected into the first matching element for the selector.

The value should be of type ```"innerHTML"``` or ```"attribute"```.

The result could look something like this:
```html
<ul async-endpoint="/api/animals/" template-selector="[animal-template]">
  <li animal-template>
    <img item-img-src src="https://source.unsplash.com/random/400x200?cat"/>
    <h2 item-title>Cat</h2>
  </li>
  <li animal-template>
    <img item-img-src src="https://source.unsplash.com/random/400x200?cat"/>
    <h2 item-title>Cat</h2>
  </li>
</ul>
```

## Adding user controls
### Load more button
```html
<button async-more>Load more!</button>
```
### Previous and Next buttons
```html
<button async-prev>Previous</button>
<button async-next>Next</button>
```

### Paging
Control the number of items per page with the optional ```async-page-limit``` attribute.
This will default to 10 items.

The limit and page requested will be appended the endpoint url with the e.g. ```/api/animals?_page=1&_limit=6```

```html
<ul 
  async-endpoint="/api/animals/" 
  template-selector="[animal-template]" 
  async-page-limit="6"
/>
```

### Filter controls
Add some checkboxes with a group selector and filter name and reference it on the wrapper element.

```html
<ul 
  async-endpoint="/api/animals/" 
  template-selector="[animal-template]" 
  filter-selector="[animal-filter]"
/>
<input animal-filter="species" type="checkbox"  name="dog">
<input animal-filter="species" type="checkbox"  name="cat">
```

The filters will be appended the endpoint url with the e.g. ```/api/animals?_page=1&_limit=6&species=dog```

## Testing
Spin up a mock API using the [json-server](https://github.com/typicode/json-server) library.

In the example project we have defined some mock data in ```db.json```. Clone the project, install the the libray and run the following command:
```
json-server --watch example/db.json --delay 500
```
 

## Authors

 **Initial work** - [AndyWebster](https://github.com/AndyWebster)



