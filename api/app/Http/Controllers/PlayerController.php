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
                'player_name' => $request->input('playername'),
                'player_title' => $request->input('playertitle'),
                'player_image' => $request->input('playerimage')
        ]);



        return response()->json($player, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Player::where('player_id', $id)->first();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $requestdata = $request->all(); 

        $requestdata['updated_at'] = date('Y-m-d');

         $player= Player::where('player_id',$id)->update($requestdata);

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
