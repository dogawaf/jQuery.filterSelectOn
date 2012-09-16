## jQuery filterSelectOn Plugin

Filter the options of a select when another select value changes.

### Usage

Let's say you need to actualize a list of Cities in regard of a selected State. With `filterSelectOn`, you just have to put a `data-parent` attribute on every option of the States <select>, and then initialize the plugin on it.

```html

<form>
    <label>Parent select</label>
    <select name="states">
        <option value="">Select a State</option>
        <option value="09" data-parent="">09- Ariège</option>
        <option value="32" data-parent="">32- Gers</option>
    </select>
    <br />
    <label>Child select</label>
    <select name="cities">
        <option value="">Select a City</option>
        <option value="PAMIERS" data-parent="09">09 - PAMIERS</option>
        <option value="MAUVEZIN" data-parent="32">32 - MAUVEZIN</option>
        <option value="CAHORS" data-parent="46">46 - CAHORS</option>
        <option value="FIGEAC" data-parent="46">46 - FIGEAC</option>
        <option value="BORDERES SUR L'ECHEZ" data-parent="65">65 - BORDERES SUR L'ECHEZ</option>
        <option value="IBOS" data-parent="65">65 - IBOS</option>
        <option value="LANNEMEZAN" data-parent="65">65 - LANNEMEZAN</option>
        <option value="RABASTENS DE BIGORRE" data-parent="65">65 - RABASTENS DE BIGORRE</option>
        <option value="SOULOM" data-parent="65">65 - SOULOM</option>
        <option value="TARBES" data-parent="65">65 - TARBES</option>
        <option value="TOURNAY" data-parent="65">65 - TOURNAY</option>
        <option value="ALBI" data-parent="81">81 - ALBI</option>
    </select>
</form>

<script src="jquery.filterSelectOn.js"></script>
<script>

	$(document).ready(function() {
		var $s = $('select[name=cities]').filterSelectOn({
			parentSelector: 'select[name=states]'
		});
	});​

</script>
```

When you initialize the plugin, the selector correspond to the select you want to filter, and the `parentSelector` option must correspond to the select which will trigger the onChange event.
