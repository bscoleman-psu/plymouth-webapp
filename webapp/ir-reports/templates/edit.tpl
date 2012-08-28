{box size="16" title="Link Editor"}
	<form action='{$base_url}/edit/' method='POST'>
		<table class='table table-striped'>
			<thead>
				<tr>
					<th>File name</th>
					<th>Display name</th>
				</tr>
			</thead>
			<tbody>
				{foreach from=$files item=file}
					<tr>
						<td><a href='{$base_url}/reports/{$file.file_name}'>{$file.file_name}</a></td>
						<td><input class='input-box' value='{$file.display_name}' name='{$file.file_name}'></td>
					</tr>
				{/foreach}
			<tbody>
		</table>
		<div class='form-actions'>
			<center><input type='submit' class='btn btn-primary' value='Confirm ALL the changes'></center>
		</div>
	</form>
{/box}
