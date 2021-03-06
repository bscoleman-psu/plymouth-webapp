{if $call_id}
	<form name="new_call" method="post" action="{$PHP.BASE_URL}/update_call_details.html" id="edit_call" enctype="multipart/form-data">
	<input type="hidden" name="call_history_id" value="{$call_history_id}" />
	<input type="hidden" name="call_id" id="call_id" value="{$call_id}" />
	<input type="hidden" name="in" id="in" value="{$go_back.in|htmlentities}" />
{else}
	<form name="new_call" method="post" action="{$PHP.BASE_URL}/add_new_call.html" id="new_call" enctype="multipart/form-data">
{/if}

{col size=6 id="call-information"}

	<h3 class="printonly">{$title|escape}</h3>

	{if $go_back}
		{box class="noprint"}
			<a href="{$go_back.url}" class="btn btn-danger">&laquo; Back to {$go_back.name}</a>
		{/box}
	{/if}

	{capture name="secondary"}
		<a href='{$PHP.BASE_URL}/user/{$person.username}' class='btn'>New Call</a>
	{/capture}

	{box title="Caller Information" title_size=4 secondary_title=$smarty.capture.secondary}
		<div id="caller_information_div">
			{include file='user_information.tpl'}
		</div>

		<div class="center noprint">
			<a href="#" id="change-caller-toggle" class="replace-toggle">Re-attach Call</a>
			<div id="change_caller" style="display:none;">
				Change Caller To: <input type="text" name="attach_to"/><br/>
				<small><em>Enter username to re-attach this ticket</em></small>
			</div>
		</div>
	{/box}

	{box title="Files" class="noprint"}
		<input type="hidden" name="MAX_FILE_SIZE" value="3145728" />
		Attach File: <input type="file" name="attachment" id='attach_files'/><br/>
		<small><em>Supports: .doc, .docx, .gif, .jpg, .pdf, .png,<br/>.txt, .xls., .xlsx (3MB maximum)</em></small>
		{if $files}
		<h3>Attached Files</h3>
		<ul>
			{foreach from=$files item=file}
				<li><a href="{$file.url}" target="_blank">{$file.name}</a>
			{/foreach}
		</ul>
		{/if}
	{/box}

	{box title="Hardware Info" class="noprint"}
		<div id='hardwareInfoDiv'>
			{$hardware_info}
		</div>
	{/box}

	{box title="Ticket History" id="call-history" class="noprint"}
		{$call_history_summary}
	{/box}

	{box title="Print Quota" class="noprint"}
		<div id="user_quotas_div">
			{$user_quota}
		</div>
	{/box}

	{box title="Restore Request" class="noprint"}
		<a href="#" class="replace-toggle">Enter Restore Request</a>
		<div id="restore_request_div">
			{$restore_request_func}
		</div>
	{/box}
{/col}

{col size=10}
	{box title=$details_name class="call-form noprint"}
		{include file="ticket_form.tpl"}
		<label class="label">Keywords:</label>
		<input type="text" name="keywords_list" id="keywords_list" size="51" placeholder="Nouns related to this ticket..." value="{$call_assignment_history_keywords}"/>
		<div id="keywordsList"></div>
		
		<input type="hidden" id="call_status" name="call_status" value="{if isset($call_status)}{$call_status}{else}open{/if}" />

		{col size=4 class="alpha omega meta"}
			<label for="call_priority" class="label">Priority:</label>
				<select name="call_priority" id="call_priority">
				{$call_priority_select_list}
			</select>
			
			<br clear="left"/>

			<label for="call_state" class="label">State:</label>
				<select name="call_state" id="call_state">
				{$call_state_select_list}
			</select>

			<br clear="left"/>

			<label for="call_location" class="label">Location:</label>
			<select name="call_location">
				<option value="n/a">No Building Selected</option>
				{$building_select_list}
			</select>
		{/col}

		{col size=2 class="alpha omega resnet"}
			<label for="call_status" class="label">Resnet?</label>
			<input type="checkbox" name="resnet_check" id="resnet_check" {$is_resnet}/>
		{/col}

		{col size=4 class="alpha omega assignment"}
			<label for="tlc_assigned_to">Assign To:</label>
			<select name="tlc_assigned_to" id="tlc_assigned_to" onChange="change_status('tlc_assigned_to');">
				<option value="unassigned">Unassigned</option>
				<option value="caller">The Caller</option>
				{$tlc_select_list}
			</select>

			<br clear="left"/>
			
			<label for="its_assigned_group">Group: (<a href="{$PHP.BASE_URL}/business-area.html?clean=1" id="its-group-help" title="ITS Group Responsibilities">?</a>)</label>
			<select name="its_assigned_group" id="its_assigned_group" onChange="change_status('its_assigned_group');" >
				<option value="0">Unassigned</option>
				{$its_select_group_list}
			</select>
		{/col}
		{col size=10 class="form-actions center submit-buttons"}
			<button type="submit" class="btn btn-primary update_ticket" name='toggle' value='0'>{if $call_id}Update{else}Submit{/if} Ticket</button>
			<button type="submit" class="btn btn-info" name='toggle' value='1'>{if $call_status == 'open' || !$call_id}Close{else if $call_status == 'closed'}Reopen{/if} Ticket</button>
		{/col}
	{/box}

	{if $history}
		{box title="Assignment History" class="grid_10"}
			<div class="noprint">
			Re-order: 
				<a href="javascript: reorder_assign_history('old', '{$person.username}', {$call_id});" class="btn">Old-New</a> | 
				<a href="javascript: reorder_assign_history('new', '{$person.username}', {$call_id});" class="btn">New-Old</a>
			<br /><br />
			</div>
			<div id="call_assignment_history">
			{include file="ticket-history.tpl"}
			</div>
		{/box}
	{/if}
		
{/col}
</form>
