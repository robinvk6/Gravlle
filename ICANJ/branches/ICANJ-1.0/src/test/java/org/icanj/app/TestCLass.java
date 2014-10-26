/*package org.icanj.app;

import org.icanj.app.directory.entity.Address;
import org.icanj.app.directory.entity.Family;
import org.icanj.app.directory.entity.Member;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import java.io.File;
import java.io.IOException;
import jxl.Cell;
import jxl.CellType;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

@DirtiesContext
@ContextConfiguration(locations = { "/root-context.xml" })
public class TestCLass extends AbstractJUnit4SpringContextTests {

	static String inputFile = "C:/Users/Workstation/Documents/STS-Workspace/ICANJ_App/ICANJDevApp/ICANJ/src/test/resources/church-address-2003.xls";
	// static String
	// inputFile="C:/Users/R512276/Documents/JPMM-Workspace/ICANJ/src/test/resources/church-address-2003.xls";

	@Autowired
	private HibernateTemplate hibernateTemplate;

	@Test
	public void read() {
		File inputWorkbook = new File(inputFile);
		Workbook w;
		Sheet sheet = null;
		try {
			try {
				w = Workbook.getWorkbook(inputWorkbook);
				sheet = w.getSheet(0);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// Get the first sheet

			// Loop over first 10 column and lines

			for (int j = 0; j < sheet.getRows(); j++) {

				Family family = new Family();
				Address address = new Address();

				family.setFamilyName(sheet.getCell(1, j).getContents() + " "
						+ sheet.getCell(0, j).getContents());
				family.setHomePhoneNumber(sheet.getCell(3, j).getContents()
						.replace(" ", "").replaceAll("^\\s+|\\s+$", ""));

				if (sheet.getCell(6, j).getContents() != null
						&& !sheet.getCell(6, j).getContents().equals(""))
					family.setEmailAddress(sheet.getCell(6, j).getContents()
							.replace(" ", "").replaceAll("^\\s+|\\s+$", ""));
				else
					family.setEmailAddress("no_email_found");
				System.out.println();
				String alAddress[] = sheet.getCell(4, j).getContents()
						.split(",");

				if (alAddress.length > 2) {
					address.setStreetAddress(alAddress[0].replaceAll(
							"^\\s+|\\s+$", ""));
					address.setCity(alAddress[1].replaceAll("^\\s+|\\s+$", ""));
					address.setState(alAddress[2].replaceAll("^\\s+|\\s+$", ""));
					address.setCountry("USA");
					address.setZip(alAddress[3].replaceAll("^\\s+|\\s+$", ""));
					family.setAddress(address);
					address.setFamily(family);

					long id = (Long) hibernateTemplate.save(family);

					Member member = new Member();
					member.setFamilyId(id);
					member.setFirstName(sheet.getCell(1, j).getContents());
					member.setLastName(sheet.getCell(0, j).getContents());
					member.setMemberRelation("Father");
					member.setCellPhoneNumber(sheet.getCell(7, j).getContents()
							.replace(" ", "").replaceAll("^\\s+|\\s+$", ""));
					member.setEmail(family.getEmailAddress());
					member.setInteractiveAccess(false);
					hibernateTemplate.save(member);

					if (sheet.getCell(2, j).getContents().trim() != null
							&& !sheet.getCell(2, j).getContents().trim()
									.equals("")) {
						Member spouse = new Member();
						spouse.setFamilyId(id);
						spouse.setFirstName(sheet.getCell(2, j).getContents());
						spouse.setLastName(sheet.getCell(0, j).getContents());
						spouse.setMemberRelation("Wife");
						spouse.setCellPhoneNumber(sheet.getCell(8, j)
								.getContents().replace(" ", "")
								.replaceAll("^\\s+|\\s+$", ""));

						if (sheet.getCell(9, j).getContents() != null
								&& !sheet.getCell(9, j).getContents()
										.equals("")) {
							spouse.setEmail(sheet.getCell(9, j).getContents()
									.replace(" ", "")
									.replaceAll("^\\s+|\\s+$", ""));
						}

						spouse.setInteractiveAccess(false);
						hibernateTemplate.save(spouse);
					}

					String children[] = sheet.getCell(5, j).getContents()
							.trim().split(",");
					if (children.length > 0) {
						for (int c = 0; c < children.length; c++) {
							if (!children[c].trim().equals("")) {
								Member child = new Member();
								child.setFirstName(children[c].replaceAll(
										"^\\s+|\\s+$", ""));
								child.setLastName(member.getLastName());
								child.setFamilyId(id);
								child.setInteractiveAccess(false);
								hibernateTemplate.save(child);
							}
						}
					}

				} else {

				}

			}
		} catch (BiffException e) {
			e.printStackTrace();
		}
	}

}
*/