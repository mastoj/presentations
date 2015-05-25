namespace FSharp.Wicked
open System

module Types = 
    type Id = Id of Guid
    type Entity<'T> = Id * 'T
    let createEntity state = Id (Guid.NewGuid()), state


    type ExpirationType = 
        | AssignmentExpiration of string * int
        | FixedExpiration of string * int

    type OfferType = 
        {
            Name: string
            ExpirationType: ExpirationType
            DaysValid: int
            BeginDate: DateTime option
        }

    type MemberState = 
        private {
            FirstName: string
            LastName: string
            Email: string
            AssignedOffers: Offer list
        }
    and Member = Entity<MemberState>
    and OfferState = 
        {
            OfferType: OfferType
            DateExpiring: DateTime
            Value: int
            Member: Member
        }
    and Offer = Entity<OfferState>

    let createMemberState firstName lastName email =
        {FirstName = firstName; LastName = lastName; Email = email; AssignedOffers = []}

    let assignOffer (id, memberState) offer =
        (id, {memberState with AssignedOffers = offer::memberState.AssignedOffers})

    let getFullName memberState = sprintf "%s %s" memberState.FirstName memberState.LastName

module internal OfferType = 
    open Types
    let CalculateExpirationDate offerType = 
        let fixedExpirationCalculation ot =
            match ot.BeginDate with
            | None -> raise (new InvalidOperationException())
            | Some d -> d.AddDays(float ot.DaysValid)

        let assignmentExpirationCalculation ot = 
            DateTime.Now.AddDays(float ot.DaysValid)

        match offerType.ExpirationType with
        | FixedExpiration _ -> fixedExpirationCalculation offerType
        | AssignmentExpiration _ -> assignmentExpirationCalculation offerType

module internal Member = 
    open Types
    open OfferType

    let AssigneMemberToOfferType memberEntity offerType offerValueCalculator = 
        let dateExpiring = CalculateExpirationDate offerType
        let value = offerValueCalculator memberEntity offerType
        let offerState = 
            {  
                OfferType = offerType
                DateExpiring = dateExpiring
                Value = value
                Member = memberEntity
            }
        let offer = offerState |> createEntity
        assignOffer memberEntity offer
        offer
        
module OfferService =
    open Types
    open Member

    let assignOffer getMember getOfferType saveOffer offerValueCalculator memberId offerTypeId = 
        let memberEntity = getMember memberId
        let offerType = getOfferType offerTypeId
        let offer = AssigneMemberToOfferType memberEntity offerType offerValueCalculator
        saveOffer offer