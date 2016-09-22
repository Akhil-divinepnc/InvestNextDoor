
'use strict';

(function() {

  class LenderController{
    constructor($scope, Lender, $state) {
      var vm = this;
      vm.$scope = $scope;
      vm.Lender = Lender;
      vm.$state = $state;

      vm.lender ={
        Country:'', 
       
      };
      vm.lenderHO ={
        country:'', 
       
      };

      /*****
      oa= Office Address
      hoa = Head Office Address
      *****/

      vm.oa={}; 
      vm.hoa={}; 
      vm.lenderinfo={};
      vm.customizations=false;
      vm.integration=false;
      vm.directory=false;
      vm.govtprogram=false;
      vm.zip = /^\d+$/;

      /* line 30-33  To hide/show part of pages on NEXT/BACK button.*/
      vm.first= false;
      vm.second= true;
      vm.third=  true;
      vm.fourth= true;

      vm.countries = Lender.getCountry();
      vm.customertypes = Lender.getCustomerType();
      vm.customersubtypes = Lender.getCustomerSubType();
      vm.conCustomersubtypes = angular.copy(vm.customersubtypes);
      vm.businessCustomersubtypes = angular.copy(vm.customersubtypes);
      vm.producttypes = Lender.getProductType();
      vm.consumerProducttypes =angular.copy(vm.producttypes);
      vm.businessProducttypes =angular.copy(vm.producttypes);
      vm.commercialProducttypes =angular.copy(vm.producttypes);
      vm.INDproducttypes = Lender.getProductTypeWithIND();
      vm.INDconsumersProductTypes = angular.copy(vm.INDproducttypes);
      vm.INDbusinessProductTypes = angular.copy(vm.INDproducttypes);
      vm.INDcommercialProductTypes = angular.copy(vm.INDproducttypes);
      vm.techadmins = [{id: 'choice1'}];
      vm.bizOwners = [{id: 'choice1'}];
      vm.Managers = [{id: 'choice1'}];
    }
    /* update address to head office address on checked */
    update(){
      this.hoa = angular.copy(this.oa);
      this.lenderHO.country = angular.copy(this.lender.Country);
    }


      /****** Get Financial Institution  list on basis of selected country *****/
    getFinancerList(){
      this.list = this.Lender.getFinancerList(this.lender.Country);
      console.log(this.list);
    }

     /***** Get  government program list on basis of selected country *****/
    getgovtProgram() {
     this.countryGovtPrograms = this.Lender.getgovtProgram(this.lender.Country);
    }

    /***** Add/Remove dynamically input field for adding more list *****/

    addField(type) {
      if(type=='admin'){
        var newItemNo = this.techadmins.length+1;
        this.techadmins.push({'id':'choice'+newItemNo});
      }
      if(type=='owner'){
        var newItemNo = this.bizOwners.length+1;
        this.bizOwners.push({'id':'choice'+newItemNo});
      }
      if(type=='manager'){
        var newItemNo = this.Managers.length+1;
        this.Managers.push({'id':'choice'+newItemNo});
      }
    }

    removeField(type){
      if(type=='admin'){
        var lastItem = this.techadmins.length-1;
        this.techadmins.splice(lastItem);
      }
      if(type=='owner'){
        var lastItem = this.bizOwners.length-1;
        this.bizOwners.splice(lastItem);
      }
      if(type=='manager'){
        var lastItem = this.Managers.length-1;
        this.Managers.splice(lastItem);
      }
    }

    /***** END  Add/Remove dynamically input field*****/

    submit(){

       var financialInstitution=[];
       var govtProgram=[];
       var custType=[];
       var subType=[];
       var bizzType=[];
       var consumerProductType=[];
       var commercialProductType=[];
       var businessProducttype=[];
       var INDconsumersProductType=[];
       var INDbusinessProductType=[];
       var INDcommercialProductType=[];

      angular.forEach(this.list, function(item){
        if(!!item.selected)financialInstitution.push(item.value);
      })
      if(this.otherfinancer){
      financialInstitution.push(this.otherfinancer);
    }
     
      angular.forEach(this.countryGovtPrograms, function(govtprogram){
        if(!!govtprogram.selected)govtProgram.push(govtprogram.value);
      })

      angular.forEach(this.customertypes, function(customer){
        if(!!customer.status)custType.push(customer.value);
      })
      angular.forEach(this.conCustomersubtypes, function(item){
        if(!!item.selected)subType.push(item.value);
      })
      angular.forEach(this.businessCustomersubtypes, function(item){
        if(!!item.selected)bizzType.push(item.value);
      })
      angular.forEach(this.consumerProducttypes, function(item){
        if(!!item.selected)consumerProductType.push(item.value);
      })
      angular.forEach(this.commercialProducttypes, function(item){
        if(!!item.selected)commercialProductType.push(item.value);
      })
      angular.forEach(this.businessProducttypes, function(item){
        if(!!item.selected)businessProducttype.push(item.value);
      })
      angular.forEach(this.INDconsumersProductTypes, function(item){
        if(!!item.selected)INDconsumersProductType.push(item.value);
      })
      angular.forEach(this.INDbusinessProductTypes, function(item){
        if(!!item.selected)INDbusinessProductType.push(item.value);
      })
      angular.forEach(this.INDcommercialProductTypes, function(item){
        if(!!item.selected)INDcommercialProductType.push(item.value);
      })

      var data ={
        lender:this.lenderinfo,
        country:this.lender.Country,
        officeAddress:this.oa,
        headOfficeAddress:this.hoa,
        instituteName:this.institutename,
        financialInstitution:financialInstitution,
        govtPrograms:govtProgram,
        custType:custType,
        consumerSubType:subType,
        businessSubType:bizzType,
        consumerProductType: consumerProductType,
        businessProducttype:businessProducttype,
        commercialProductType:commercialProductType,
        INDconsumersProductType: INDconsumersProductType,
        INDbusinessProductType: INDbusinessProductType,
        INDcommercialProductType: INDcommercialProductType,
        startDate:this.startdate,
        customizationLead:{
          firstName:this.primaryLeadFName,
          lastName:this.primaryLeadLname,
          email:this.primaryLeadEmail
        },
        integrationLead:{
          firstName:this.integratorFname,
          lastName:this.integratorLname,
          email:this.integratorEmail

        },
        directoryLead:{

          firstName:this.directoryFname,
          lastName:this.directoryLname,
          email:this.directoryEmail
        },
        acceptBilling:{
          signature:this.signature,
          date:this.acceptdate
        },
        
      }
      alert(JSON.stringify(data));
      this.Lender.setLenderDetails(data);

      this.$state.go('lender.info');

    }
    
}
angular.module('investnextdoorCaApp')
.controller('LenderController', LenderController);
})();
