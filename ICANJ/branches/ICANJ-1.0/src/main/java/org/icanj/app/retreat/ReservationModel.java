/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.icanj.app.retreat;

/**
 *
 * @author maxjerin
 */
public class ReservationModel {
    
    private long memberId;
    private long familyId;
    private boolean isGoing;
    private String memberName;
    private String roomType;
    private String shirtType;
    private String ageGroup;

    public long getMemberId() {
        return memberId;
    }

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    public long getFamilyId() {
        return familyId;
    }

    public void setFamilyId(long familyId) {
        this.familyId = familyId;
    }

    public boolean isIsGoing() {
        return isGoing;
    }

    public void setIsGoing(boolean isGoing) {
        this.isGoing = isGoing;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public String getShirtType() {
        return shirtType;
    }

    public void setShirtType(String shirtType) {
        this.shirtType = shirtType;
    }

    public String getAgeGroup() {
        return ageGroup;
    }

    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }
    
}
