<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Player::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $player = Player::create([
                'PlayerName' => $request->input('name')
        ]);



        return response()->json($player, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Player::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $requestdata = $request->all(); 

        $requestdata['date_created'] = date('Y-m-d');

         $player= Player::where('id',$id)->update($requestdata);

        if ($player) {

            return 'true';

        }else{

            return 'false';

        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Player::destroy($id);
    }
}
