// Interface
import { PartialStudent } from '@/interfaces';

export class StudentTemplate {
  /**
	 * Displays the table title
	 */
	static renderTableThead(): string {
    const tableThead: string = `
    <li class="table-thead">
      <span></span>
      <span>Name</span>
      <span>Email</span>
      <span>Phone</span>
      <span>Enroll Number</span>
      <span>Date of admission</span>
      <span></span>
      <span></span>
    </li>
  `

  return tableThead;
  }

	/**
	 * Display table rows when data is passed in
	 *
	 * @param {*} move - Object containing student data
	 */
  static renderTableRow(move: PartialStudent): string {
    const tableRow: string = `
      <li class="table-row" data-id=${move.id}>
        ${this.renderTableRowContent(move)}
      </li>`

    return tableRow;
  }

	/**
	 * Displays content cells when data is passed in
	 *
	 * @param {*} move - Object containing student data
	 */
  static renderTableRowContent(move: PartialStudent): string {
    const tableRow: string = `
    <span><img src="/avatar.7bb99cdb.svg" alt="avatar student" class="avt-student"></span>
    <span>${move.name}</span>
    <span>${move.email}</span>
    <span>${move.phone}</span>
    <span>${move.enrollNumber}</span>
    <span>${move.dateOfAdmission}</span>
    <span><button class="btn-table btn-edit" data-id=${move.id}><img src="/btn-edit.87768a19.svg"></button></span>
    <span><button class="btn-table btn-delete btn-table-delete" data-id=${move.id}><img src="/btn-delete.98640746.svg"></button></span>
    `

    return tableRow;
  }
}
