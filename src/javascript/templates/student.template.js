export class StudentTemplate {
  // Display table rows when data is passed in
  static renderTableRow(move) {
    const tableRow = `
    <tr class="content-row" data-id=${move.id}>
      <td>
        <img src="/avatar.963bec68.svg" alt="avatar student" class="avt-student"/>
      </td>
      <td>${move.Name}</td>
      <td>${move.Email}</td>
      <td>${move.Phone}</td>
      <td>${move.EnrollNumber}</td>
      <td>${move.DateOfAdmission}</td>
      <td>
        <button class="btn-table btn-edit" aria-label="Edit student" data-id=${move.id}>
          <img src="/btn-edit.b2e14e07.svg" alt="button edit" />
        </button>
      </td>
      <td>
        <button class="btn-table btn-delete" aria-label="Delete student" data-id=${move.id}>
          <img src="/btn-delete.a39890ce.svg" alt="button delete" />
        </button>
      </td>
    </tr>
    <tr class="spacer">
      <td></td>
    </tr>`
    
    return tableRow;
  } 
}
